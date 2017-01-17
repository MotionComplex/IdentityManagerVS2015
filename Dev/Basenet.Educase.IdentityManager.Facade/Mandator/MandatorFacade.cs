using System;
using System.Collections.Generic;
using System.Linq;
using Basenet.Educase.Common.Interface.SystemTime;
using Basenet.Educase.IdentityManager.DataModel.Data;

namespace Basenet.Educase.IdentityManager.Facade.Mandator
{
    public class MandatorFacade : IMandatorFacade
    {
        private readonly IIdentityManagerEntities _dbContext;
        private readonly ISystemTime _systemTime;

        public MandatorFacade(ISystemTime systemTime)
            : this(new IdentityManagerEntities(), systemTime)
        {
        }

        public MandatorFacade(IIdentityManagerEntities context, ISystemTime sytemTime)
        {
            _dbContext = context;
            _systemTime = sytemTime;
        }

        public IEnumerable<Models.Mandator> GetMandators()
        {
            var mandators = _dbContext.Mandators.Select(mandator => new Models.Mandator
            {
                UID = mandator.UID,
                Name = mandator.Name,
                Title = mandator.Title
            });

            return mandators;
        }

        public IEnumerable<Models.Mandator> GetAssignedMandators(Guid clientUid)
        {
            var mandators = _dbContext.Mandators
                .Where(m => m.ClientToMandators.Any(c => c.ClientUID == clientUid))
                .Select(mandator => new Models.Mandator
                {
                    UID = mandator.UID,
                    Name = mandator.Name,
                    Title = mandator.Title
                });

            return mandators;
        }
        
        public void UpdateClientToMandators(Guid clientUid, IEnumerable<Models.Mandator> mandators)
        {
            RemoveClientToMandators(clientUid);

            foreach (var mandator in mandators)
            {
                AddClientToMandator(clientUid, mandator);
            }

            _dbContext.SaveChanges();
        }

        // Removes all ClientToMandators to add the newly assigned ones
        private void RemoveClientToMandators(Guid clientUid)
        {
            var clientToMandatorsToRemove = _dbContext.ClientToMandators.Where(ctm => ctm.ClientUID == clientUid);

            foreach (var clientToMandator in clientToMandatorsToRemove)
            {
                _dbContext.ClientToMandators.Remove(clientToMandator);
            }
        }

        private void AddClientToMandator(Guid clientUid, Models.Mandator mandator)
        {
            _dbContext.ClientToMandators.Add(new ClientToMandator
            {
                UID = Guid.NewGuid(),
                ClientUID = clientUid,
                MandatorUID = mandator.UID,
            });
        }
    }
}
