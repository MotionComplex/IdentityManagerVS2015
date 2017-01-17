using System.Collections.Generic;

namespace Basenet.Educase.IdentityManager.Facade.Scope
{
    public interface IScopeFacade
    {
        IEnumerable<Models.Scope> GetScopes();

        void AddOrUpdateScope(Models.Scope scope);
    }
}
