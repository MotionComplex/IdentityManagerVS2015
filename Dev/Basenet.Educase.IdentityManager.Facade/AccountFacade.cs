using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Basenet.Educase.Common.Interface.SystemTime;
using Basenet.Educase.Common.Logging;
using Basenet.Educase.IdentityManager.DataModel.Data;
using Basenet.Educase.IdentityManager.Facade.Models;
using Basenet.Educase.IdentityManager.Facade.ValidationExceptions;
using Basenet.Educase.IdentityManager.Facade.Validations;

namespace Basenet.Educase.IdentityManager.Facade
{
    public class AccountFacade : IAccountFacade
    {
        private readonly IIdentityManagerEntities _dbContext;
        private readonly ISystemTime _systemTime;
        private readonly ILogger _logger;

        public AccountFacade(ISystemTime systemTime, ILogger logger)
            : this(new IdentityManagerEntities(), systemTime, logger)
        {
        }

        public AccountFacade(IIdentityManagerEntities context, ISystemTime systemTime, ILogger logger)
        {
            _dbContext = context;
            _systemTime = systemTime;
            _logger = logger;
        }

        public User GetUser(string identifier)
        {
            var account = _dbContext.Accounts
                .Where(a => a.Identifyer == identifier)
                .Select(a => new User { UID = a.UID, Name = a.Username, Firstname = a.Fistname, Lastname = a.Lastname, EmailAddress = a.Email })
                .FirstOrDefault();

            return account;
        }

        public User GetUserByClient(string client)
        {
            var account = _dbContext.Accounts
                .Where(a => a.Clients.Any(c => c.Id == client))
                .Select(a => new User { UID = a.UID, Name = a.Username, Firstname = a.Fistname, Lastname = a.Lastname, EmailAddress = a.Email })
                .FirstOrDefault();

            return account;
        }

        public IEnumerable<Tenant> GetAssignedTenants(Guid accountUid)
        {
            // ReSharper disable once PossibleNullReferenceException
            var tenants = _dbContext.Accounts.FirstOrDefault(a => a.UID == accountUid)
                .Mandators.Select(m =>
                    new Tenant
                    {
                        UID = m.UID,
                        Title = m.Title,
                        Name = m.Name
                    });

            return tenants;
        }

        public bool IsExistTenant(Guid mandatorUid)
        {
            return _dbContext.Mandators.FirstOrDefault(m => m.UID == mandatorUid) != null;
        }

        public UserAccount GetUserAccount(Guid accountUid)
        {
            var userAccount =
                _dbContext.Accounts
                    .Select(
                        a =>
                            new UserAccount
                            {
                                UID = a.UID,
                                Name = a.Username,
                                Firstname = a.Fistname,
                                Lastname = a.Lastname,
                                EmailAddress = a.Email,
                                ValidFrom = a.ValidFrom,
                                ValidTo = a.ValidTo,
                                Mobile = a.Mobile,
                                Identifier = a.Identifyer
                            })
                    .FirstOrDefault(a => a.UID == accountUid);

            return userAccount;
        }

        public bool IsExistAccountByIdentifier(string identifier)
        {
            return _dbContext.Accounts.FirstOrDefault(a => a.Identifyer == identifier) != null;
        }

        public bool IsExistAccountSameIdentifier(string identifier, Guid accountUID)
        {
            return _dbContext.Accounts.FirstOrDefault(a => a.UID == accountUID && a.Identifyer == identifier) != null;
        }

        public bool IsExistAccountByOtherIdentifiers(string identifyer, string ownerIdentifyer)
        {
            return _dbContext.Accounts.FirstOrDefault(a => a.Identifyer == identifyer && a.Identifyer != ownerIdentifyer) != null;
        }

        public bool IsAccountAssignedToTenant(Guid accountUid, Guid tenantUid)
        {
            var account = _dbContext.Accounts.FirstOrDefault(a => a.UID == accountUid);

            return account?.Mandators.FirstOrDefault(m => m.UID == tenantUid) != null;
        }

        public void AddOrUpdateAccount(Guid mandatorUid, UserAccount userAccount)
        {
            var validationMessage = UnprocessableEntityValidator.Validate(mandatorUid, userAccount);
            if (!string.IsNullOrEmpty(validationMessage))
            {
                _logger.Info($"User \"{userAccount.Name}\" or Tenant \"{mandatorUid}\" is invalid", category: "UserManagement");
                throw new UnprocessableEntityException(validationMessage);
            }

            var resrouceValidator = new ResourceValidator(this);
            var resourceValidationMessage = resrouceValidator.Validate(mandatorUid, userAccount);
            if (!string.IsNullOrEmpty(resourceValidationMessage))
            {
                _logger.Info($"Either Tenant \"{mandatorUid}\" is not exist or User \"{userAccount.Name}\" with Identifier \"{userAccount.Identifier}\" is not correct", category: "UserManagement");
                throw new NotFoundException(resourceValidationMessage);
            }

            var account = GetAccount(userAccount.UID);
            if (account == null)
            {
                account = GetAccount(userAccount.Identifier);
                if (account == null)
                {
                    if (userAccount.UID == Guid.Empty)
                    {
                        userAccount.UID = Guid.NewGuid();
                    }

                    AddAccount(mandatorUid, userAccount);
                }
                else
                {
                    UpdateUserAccount(account, userAccount, mandatorUid);
                }
            }
            else
            {
                if (account.Identifyer != userAccount.Identifier && !string.IsNullOrEmpty(account.Identifyer))
                {
                    throw new Exception("User with the UID exists with another identifier");
                }
                
                UpdateUserAccount(account, userAccount, mandatorUid);
            }
        }

        private void AddAccount(Guid mandatorUid, UserAccount userAccount)
        {
            var tenant = _dbContext.Mandators.FirstOrDefault(m => m.UID == mandatorUid);
            var account = new Account
            {
                UID = userAccount.UID,
                Username = userAccount.Name,
                Fistname = userAccount.Firstname,
                Lastname = userAccount.Lastname,
                Email = userAccount.EmailAddress,
                Identifyer = userAccount.Identifier,
                ValidFrom = userAccount.ValidFrom ?? _systemTime.Now,
                ValidTo = userAccount.ValidTo,
                Mobile = userAccount.Mobile,
                Mandators = new List<DataModel.Data.Mandator> { tenant }
            };

            _dbContext.Accounts.Add(account);
            _dbContext.SaveChanges();
        }

        private Account GetAccount(string identifier)
        {
            var account = _dbContext.Accounts.Include(c => c.Mandators).FirstOrDefault(m => m.Identifyer == identifier);
            return account;
        }

        private Account GetAccount(Guid accountUid)
        {
            var account = _dbContext.Accounts.Include(c => c.Mandators).FirstOrDefault(m => m.UID == accountUid);
            return account;
        }

        private void UpdateUserAccount(Account account, UserAccount userAccount, Guid mandatorUid)
        {
            if (account == null)
            {
                throw new ArgumentNullException(nameof(account));
            }

            account.Username = userAccount.Name;
            account.Fistname = userAccount.Firstname;
            account.Lastname = userAccount.Lastname;
            account.Email = userAccount.EmailAddress;
            account.Identifyer = userAccount.Identifier;
            account.ValidFrom = userAccount.ValidFrom ?? _systemTime.Now;
            account.ValidTo = userAccount.ValidTo;
            account.Mobile = userAccount.Mobile;

            if (account.Mandators == null)
            {
                account.Mandators = new List<DataModel.Data.Mandator>();
            }

            if (!account.Mandators.Any(m => m.UID == mandatorUid))
            {
                var tenant = _dbContext.Mandators.FirstOrDefault(m => m.UID == mandatorUid);
                account.Mandators.Add(tenant);
            }

            _dbContext.SaveChanges();
        }
    }
}
