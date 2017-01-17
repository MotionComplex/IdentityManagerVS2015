using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Basenet.Educase.IdentityManager.Facade.Models;

namespace Basenet.Educase.IdentityManager.Facade.Claim
{
    public interface IClaimFacade
    {
        List<Models.Claim> GetClaims();

        List<Models.Claim> GetAssignedClaims(Guid scopeUid);

        void UpdateScopeToClaims(Guid uid, List<Models.Claim> claims);
    }
}
