using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Basenet.Educase.Common.Interface.SystemTime;
using Basenet.Educase.Common.Logging;
using Basenet.Educase.Common.Service;
using Basenet.Educase.IdentityManager.DataModel.Data;
using Basenet.Educase.IdentityManager.Facade;
using Basenet.Educase.IdentityManager.Facade.Models;
using Moq;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace Basenet.Educase.IdentityProvider.DataModel.UnitTest
{
    [TestFixture]
    public class AccountFacadeTests
    {
        private readonly ISystemTime _sytemTime = new SystemTime();
        private readonly ILogger _logger;

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_AccountFacade_GetUser()
        {
            var accounts = new List<Account> { new Account { Identifyer = "1", UID = Guid.Parse("6C3F360C-E008-4E59-B4D1-9500ECB6B5D6") }, new Account { Identifyer = "2", UID = Guid.Parse("B4E01E57-C9AA-450B-A893-00C309A0BE14") } };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Accounts).Returns(accounts.MockDbSet().Object);

            var facade = new AccountFacade(context.Object, _sytemTime, _logger);

            var user = facade.GetUser("1");

            Assert.AreEqual(Guid.Parse("6C3F360C-E008-4E59-B4D1-9500ECB6B5D6"), user.UID);
        }

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_AccountFacade_GetUserByClient()
        {
            var accounts = new List<Account>
            {
                new Account
                {
                    Identifyer = "1",
                    UID = Guid.Parse("6C3F360C-E008-4E59-B4D1-9500ECB6B5D6"),
                    Clients = new List<IdentityManager.DataModel.Data.Client> { new IdentityManager.DataModel.Data.Client { Id = "client1" } }
                },
                new Account
                {
                    Identifyer = "2", UID = Guid.Parse("B4E01E57-C9AA-450B-A893-00C309A0BE14"),
                    Clients = new List<IdentityManager.DataModel.Data.Client> { new IdentityManager.DataModel.Data.Client { Id = "client2" } }
                }
            };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Accounts).Returns(accounts.MockDbSet().Object);

            var facade = new AccountFacade(context.Object, _sytemTime, _logger);

            var user = facade.GetUserByClient("client1");

            Assert.AreEqual(Guid.Parse("6C3F360C-E008-4E59-B4D1-9500ECB6B5D6"), user.UID);
        }

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_AccountFacade_GetAssignedTenants_Multiple()
        {
            var accounts = new List<Account>
            {
                new Account
                {
                    Identifyer = "1", UID = Guid.Parse("6C3F360C-E008-4E59-B4D1-9500ECB6B5D6"),
                    Mandators = new List<IdentityManager.DataModel.Data.Mandator>
                    {
                        new IdentityManager.DataModel.Data.Mandator { UID = Guid.Parse("5DBF0374-1436-4D38-BAFF-30F32C0C011A") },
                        new IdentityManager.DataModel.Data.Mandator { UID = Guid.Parse("E27455B3-81DA-46DA-9C9A-FE1C6F042878") }
                    }
                },
                new Account
                {
                    Identifyer = "2", UID = Guid.Parse("B4E01E57-C9AA-450B-A893-00C309A0BE14"),
                    Mandators = new List<IdentityManager.DataModel.Data.Mandator>
                    {
                        new IdentityManager.DataModel.Data.Mandator { UID = Guid.Parse("5DBF0374-1436-4D38-BAFF-30F32C0C011A") }
                    }
                }
            };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Accounts).Returns(accounts.MockDbSet().Object);

            var facade = new AccountFacade(context.Object, _sytemTime, _logger);

            var tenants = facade.GetAssignedTenants(Guid.Parse("6C3F360C-E008-4E59-B4D1-9500ECB6B5D6")).ToList();

            Assert.That(tenants.Any(t => t.UID == Guid.Parse("5DBF0374-1436-4D38-BAFF-30F32C0C011A")));
            Assert.That(tenants.Any(t => t.UID == Guid.Parse("E27455B3-81DA-46DA-9C9A-FE1C6F042878")));
        }

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_AccountFacade_GetAssignedTenants_Single()
        {
            var accounts = new List<Account>
            {
                new Account
                {
                    Identifyer = "1", UID = Guid.Parse("6C3F360C-E008-4E59-B4D1-9500ECB6B5D6"),
                    Mandators = new List<IdentityManager.DataModel.Data.Mandator>
                    {
                        new IdentityManager.DataModel.Data.Mandator { UID = Guid.Parse("5DBF0374-1436-4D38-BAFF-30F32C0C011A") },
                        new IdentityManager.DataModel.Data.Mandator { UID = Guid.Parse("E27455B3-81DA-46DA-9C9A-FE1C6F042878") }
                    }
                },
                new Account
                {
                    Identifyer = "2", UID = Guid.Parse("B4E01E57-C9AA-450B-A893-00C309A0BE14"),
                    Mandators = new List<IdentityManager.DataModel.Data.Mandator>
                    {
                        new IdentityManager.DataModel.Data.Mandator { UID = Guid.Parse("5DBF0374-1436-4D38-BAFF-30F32C0C011A") }
                    }
                }
            };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Accounts).Returns(accounts.MockDbSet().Object);

            var facade = new AccountFacade(context.Object, _sytemTime, _logger);

            var tenants = facade.GetAssignedTenants(Guid.Parse("B4E01E57-C9AA-450B-A893-00C309A0BE14"));

            Assert.That(tenants.Single().UID == Guid.Parse("5DBF0374-1436-4D38-BAFF-30F32C0C011A"));
        }

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_AccountFacade_GetUserAccount()
        {
            var accounts = new List<Account>
            {
                new Account { Identifyer = "1", UID = Guid.Parse("6C3F360C-E008-4E59-B4D1-9500ECB6B5D6") }
            };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Accounts).Returns(accounts.MockDbSet().Object);

            var facade = new AccountFacade(context.Object, _sytemTime, _logger);
            var userAccount = facade.GetUserAccount(Guid.Parse("6C3F360C-E008-4E59-B4D1-9500ECB6B5D6"));

            Assert.IsNotNull(userAccount);
            Assert.AreEqual("1", userAccount.Identifier);
        }

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_AccountFacade_IsExistAccountByIdentifier()
        {
            var accounts = new List<Account>
            {
                new Account { Identifyer = "1", UID = Guid.Parse("6C3F360C-E008-4E59-B4D1-9500ECB6B5D6") }
            };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Accounts).Returns(accounts.MockDbSet().Object);

            var facade = new AccountFacade(context.Object, _sytemTime, _logger);
            var isExistAccount = facade.IsExistAccountByIdentifier("1");

            Assert.IsTrue(isExistAccount);
        }

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_AccountFacade_IsExistAccountByOtherIdentifiers()
        {
            var accounts = new List<Account>
            {
                new Account { Identifyer = "1", UID = Guid.Parse("6C3F360C-E008-4E59-B4D1-9500ECB6B5D6") },
                new Account { Identifyer = "2", UID = Guid.Parse("B4E01E57-C9AA-450B-A893-00C309A0BE14") }
            };

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Accounts).Returns(accounts.MockDbSet().Object);

            var facade = new AccountFacade(context.Object, _sytemTime, _logger);
            var isExistAccount = facade.IsExistAccountByOtherIdentifiers("2", "1");

            Assert.IsTrue(isExistAccount);
        }

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_AccountFacade_AddOrUpdateAccount_Add()
        {
            var mandatorUid = Guid.Parse("5DBF0374-1436-4D38-BAFF-30F32C0C011A");
            var mandators = new List<IdentityManager.DataModel.Data.Mandator>
            {
                new IdentityManager.DataModel.Data.Mandator { UID = mandatorUid }
            };

            var accountsDbSetMock = new List<Account>().MockDbSet();

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Mandators).Returns(mandators.MockDbSet().Object);
            context.Setup(exp => exp.Accounts).Returns(accountsDbSetMock.Object);

            var facade = new AccountFacade(context.Object, _sytemTime, _logger);
            var account = new UserAccount
            {
                EmailAddress = "test@gmail.com",
                Firstname = "First",
                Lastname = "Last",
                Name = "Name",
                Identifier = "Identifyer",
                UID = Guid.NewGuid()
            };

            facade.AddOrUpdateAccount(mandatorUid, account);

            accountsDbSetMock.Verify(o => o.Add(It.IsAny<Account>()), Times.Once);
            context.Verify(c => c.SaveChanges(), Times.Once);
        }

        [Test]
        public void Basenet_Educase_IdentityProvider_DataModel_AccountFacade_AddOrUpdateAccount_Update()
        {
            var mandatorUid = Guid.Parse("5DBF0374-1436-4D38-BAFF-30F32C0C011A");
            var accountUid = Guid.Parse("6C3F360C-E008-4E59-B4D1-9500ECB6B5D6");
            var mandators = new List<IdentityManager.DataModel.Data.Mandator>
            {
                new IdentityManager.DataModel.Data.Mandator { UID = mandatorUid }
            };
            var accountsDbSetMock =
                new List<Account>
                {
                    new Account
                    {
                        Identifyer = "1",
                        UID = accountUid,
                        Mandators = new List<IdentityManager.DataModel.Data.Mandator>
                        {
                            new IdentityManager.DataModel.Data.Mandator { UID = mandatorUid }
                        }
                    }
                }
                .MockDbSet();

            var context = new Mock<IIdentityManagerEntities>();
            context.Setup(exp => exp.Mandators).Returns(mandators.MockDbSet().Object);
            context.Setup(exp => exp.Accounts).Returns(accountsDbSetMock.Object);

            var facade = new AccountFacade(context.Object, _sytemTime, _logger);
            var account = new UserAccount
            {
                EmailAddress = "test@gmail.com",
                Firstname = "First",
                Lastname = "Last",
                Name = "Name",
                Identifier = "1",
                UID = accountUid
            };

            facade.AddOrUpdateAccount(mandatorUid, account);

            context.Verify(c => c.SaveChanges(), Times.Once);
        }
    }
}
