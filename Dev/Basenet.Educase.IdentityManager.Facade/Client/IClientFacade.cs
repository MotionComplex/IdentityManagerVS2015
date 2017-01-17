using System;
using System.Collections.Generic;

namespace Basenet.Educase.IdentityManager.Facade.Client
{
    public interface IClientFacade
    {
        Models.Client GetClient(Guid uid);

        IEnumerable<Models.Client> GetClients();

        void AddOrUpdateClient(Models.Client client);
    }
}
