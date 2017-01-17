using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Basenet.Educase.Common.Interface.SystemTime;
using Basenet.Educase.IdentityManager.DataModel.Data;

namespace Basenet.Educase.IdentityManager.Facade.Client
{
    public class ClientFacade : IClientFacade
    {
        private readonly IIdentityManagerEntities _dbContext;
        private readonly ISystemTime _systemTime;

        public ClientFacade(ISystemTime systemTime)
            : this(new IdentityManagerEntities(), systemTime)
        {
        }

        public ClientFacade(IIdentityManagerEntities context, ISystemTime systemTime)
        {
            _dbContext = context;
            _systemTime = systemTime;
        }

        public IEnumerable<Models.Client> GetClients()
        {
            var clients = _dbContext.Clients.Select(c => new Models.Client
            {
                UID = c.UID,
                Id = c.Id,
                Name = c.Name,
                Flow = c.Flow
            });

            return clients;
        }

        public Models.Client GetClient(Guid uid)
        {
            return _dbContext.Clients
                .Where(c => c.UID == uid)
                .Select(c => new Models.Client
                {
                    UID = c.UID,
                    Id = c.Id,
                    Name = c.Name,
                    Flow = c.Flow
                })
                .FirstOrDefault();
        }

        public void AddOrUpdateClient(Models.Client client)
        {
            var clientToUpdate = GetClient(client.UID);
            if (clientToUpdate == null)
            {
                AddClient(client);
            }
            else
            {
                UpdateClient(client);
            }
        }

        private void AddClient(Models.Client client)
        {
            _dbContext.Clients.Add(new DataModel.Data.Client
            {
                UID = client.UID,
                Id = client.Id,
                Name = client.Name,
                Flow = client.Flow
            });

            _dbContext.SaveChanges();
        }

        private void UpdateClient(Models.Client client)
        {
            var clientToUpdate = _dbContext.Clients.FirstOrDefault(c => c.UID == client.UID);
            if (clientToUpdate == null)
            {
                throw new ArgumentNullException(nameof(client));
            }

            clientToUpdate.Id = client.Id;
            clientToUpdate.Name = client.Name;
            clientToUpdate.Flow = client.Flow;
            
            _dbContext.SaveChanges();
        }
    }
}
