using System;
using System.Collections.Generic;
using System.Linq;
using Basenet.Educase.IdentityManager.Facade.Models;
using Basenet.Educase.IdentityManager.Facade.Properties;

namespace Basenet.Educase.IdentityManager.Facade.Validations
{
    public class ReferenceValidator
    {
        private readonly IAccountFacade _accountFacade;

        public ReferenceValidator(IAccountFacade accountFacade)
        {
            _accountFacade = accountFacade;
        }

        public string Validate(Guid mandatorUid, UserAccount account)
        {
            var validationMessages = new List<string>();

            var tenantError = ValidateAccountToTenant(mandatorUid, account);
            if (!string.IsNullOrEmpty(tenantError))
            {
                validationMessages.Add(tenantError);
            }

            return validationMessages.Any()
                ? string.Join(Environment.NewLine, validationMessages.ToArray())
                : string.Empty;
        }

        private string ValidateAccountToTenant(Guid mandatorUid, UserAccount account)
        {
            var accountById = _accountFacade.GetUserAccount(account.UID);
            if (accountById == null)
            {
                if (_accountFacade.IsExistAccountByIdentifier(account.Identifier) && account.UID != Guid.Empty)
                {
                    return string.Format(Resources.The_account_Identifyer_already_exist, account.Identifier);
                }
            }
            else
            {
                if (account.Identifier != accountById.Identifier)
                {
                    return string.Format(Resources.The_Account_can_not_be_updated_with_the_identifyer, account.Name, account.Identifier);
                }
            }

            return string.Empty;
        }
    }
}
