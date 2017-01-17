using System;
using System.Collections.Generic;

namespace Basenet.Educase.IdentityManager.Facade.Mandator
{
    public interface IMandatorFacade
    {
        IEnumerable<Models.Mandator> GetMandators();

        IEnumerable<Models.Mandator> GetAssignedMandators(Guid clientUid);

        void UpdateClientToMandators(Guid clientUid, IEnumerable<Models.Mandator> mandators);
    }
}
