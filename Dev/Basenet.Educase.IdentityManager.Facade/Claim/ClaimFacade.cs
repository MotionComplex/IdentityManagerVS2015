using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Basenet.Educase.Common.Interface.SystemTime;
using Basenet.Educase.IdentityManager.DataModel.Data;

namespace Basenet.Educase.IdentityManager.Facade.Claim
{
    public class ClaimFacade : IClaimFacade
    {
        private readonly IIdentityManagerEntities _dbContext;
        private readonly ISystemTime _systemTime;

        public ClaimFacade(ISystemTime systemTime)
            : this(new IdentityManagerEntities(), systemTime)
        {
        }

        public ClaimFacade(IIdentityManagerEntities context, ISystemTime sytemTime)
        {
            _dbContext = context;
            _systemTime = sytemTime;
        }

        public List<Models.Claim> GetClaims()
        {
            var claims = _dbContext.Claims;
            var result = new List<Models.Claim>();

            foreach (var claim in claims)
            {
                result.Add(new Models.Claim
                {
                    UID = claim.UID,
                    Name = claim.Name,
                    Description = claim.Description,
                    AlwaysIncludeInIdToken = claim.AlwaysIncludeInIdToken
                });
            }

            return result;
        }

        public List<Models.Claim> GetAssignedClaims(Guid scopeUid)
        {
            var scopeToClaims = _dbContext.ScopeToClaims.Where(stc => stc.ScopeUID == scopeUid);
            var claims = new List<Models.Claim>();

            foreach (var scopeToClaim in scopeToClaims)
            {
                var claim = _dbContext.Claims.FirstOrDefault(c => c.UID == scopeToClaim.ClaimUID);

                if (claim != null)
                {
                    claims.Add(new Models.Claim
                    {
                        UID = claim.UID,
                        Name = claim.Name,
                        Description = claim.Description,
                        AlwaysIncludeInIdToken = claim.AlwaysIncludeInIdToken
                    });
                }
            }

            return claims;
        }

        public void UpdateScopeToClaims(Guid uid, List<Models.Claim> claims)
        {
            RemoveScopeToClaims(uid);

            foreach (var claim in claims)
            {
                AddScopeToClaims(uid, claim);
            }

            _dbContext.SaveChanges();
        }

        private void AddScopeToClaims(Guid uid, Models.Claim claim)
        {
            _dbContext.ScopeToClaims.Add(new ScopeToClaim
            {
                UID = Guid.NewGuid(),
                ScopeUID = uid,
                ClaimUID = claim.UID
            });
        }

        private void RemoveScopeToClaims(Guid uid)
        {
            var scopeToClaimsToRemove = _dbContext.ScopeToClaims.Where(stc => stc.ScopeUID == uid);

            foreach (var scopeToClaimToRemove in scopeToClaimsToRemove)
            {
                _dbContext.ScopeToClaims.Remove(scopeToClaimToRemove);
            }
        }
    }
}
