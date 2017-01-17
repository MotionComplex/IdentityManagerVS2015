using System;
using System.Collections.Generic;
using Basenet.Educase.IdentityManager.Facade.Models;

namespace Basenet.Educase.IdentityManager.Facade
{
    public interface IAccountFacade
    {
        User GetUser(string identifier);

        User GetUserByClient(string client);

        IEnumerable<Tenant> GetAssignedTenants(Guid accountUid);

        bool IsExistTenant(Guid tenantUid);

        UserAccount GetUserAccount(Guid accountUid);

        bool IsExistAccountByIdentifier(string identifier);

        bool IsExistAccountByOtherIdentifiers(string identifier, string ownerIdentifier);

        bool IsAccountAssignedToTenant(Guid accountUid, Guid tenantUid);

        void AddOrUpdateAccount(Guid tenantUid, UserAccount account);
    }
}