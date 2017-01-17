using Basenet.Educase.Common.Interface.SystemTime;
using System.Collections.Generic;
using System.Linq;
using Basenet.Educase.IdentityManager.DataModel.Data;

namespace Basenet.Educase.IdentityManager.Facade.Scope
{
    public class ScopeFacade : IScopeFacade
    {
        private readonly IIdentityManagerEntities _dbContext;
        private readonly ISystemTime _systemTime;

        public ScopeFacade(ISystemTime systemTime)
            : this(new IdentityManagerEntities(), systemTime)
        {
        }

        public ScopeFacade(IIdentityManagerEntities context, ISystemTime sytemTime)
        {
            _dbContext = context;
            _systemTime = sytemTime;
        }
        
        public IEnumerable<Models.Scope> GetScopes()
        {
            var scopes = _dbContext.Scopes.Select(scope => new Models.Scope
            {
                UID = scope.UID,
                Name = scope.Name,
                DisplayName = scope.DisplayName,
                ScopeType = scope.ScopeType,
                IsRequired = scope.IsRequired
            });

            return scopes;
        }

        public void AddOrUpdateScope(Models.Scope scope)
        {
            var existingScope = _dbContext.Scopes.FirstOrDefault(s => s.UID == scope.UID);

            if (existingScope != null)
            {
                UpdateScope(existingScope, scope);
            }
            else
            {
                AddScope(scope);
            }
        }

        private void AddScope(Models.Scope scope)
        {
            _dbContext.Scopes.Add(new DataModel.Data.Scope
            {
                UID = scope.UID,
                Name = scope.Name,
                DisplayName = scope.DisplayName,
                ScopeType = scope.ScopeType,
                IsRequired = scope.IsRequired
            });

            _dbContext.SaveChanges();
        }

        private void UpdateScope(DataModel.Data.Scope existingScope, Models.Scope newScope)
        {
            existingScope.UID = newScope.UID;
            existingScope.Name = newScope.Name;
            existingScope.DisplayName = newScope.DisplayName;
            existingScope.ScopeType = newScope.ScopeType;
            existingScope.IsRequired = newScope.IsRequired;

            _dbContext.SaveChanges();
        }
    }
}
