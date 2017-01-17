using Basenet.Educase.IdentityManager.Dependency;
using Basenet.Educase.IdentityManager.Facade;
using Basenet.Educase.IdentityManager.Facade.Claim;
using Basenet.Educase.IdentityManager.Facade.Client;
using Basenet.Educase.IdentityManager.Facade.Mandator;
using Basenet.Educase.IdentityManager.Facade.Scope;
using Microsoft.Practices.Unity;

namespace Basenet.Educase.IdentityManager.Dependency
{
    public class ApiServiceDependencyMap : IDependencyMap
    {
        public void RegisterDependencies(IUnityContainer container)
        {
            container.RegisterType<IAccountFacade, AccountFacade>();
            container.RegisterType<IClientFacade, ClientFacade>();
            container.RegisterType<IMandatorFacade, MandatorFacade>();
            container.RegisterType<IScopeFacade, ScopeFacade>();
            container.RegisterType<IClaimFacade, ClaimFacade>();
        }
    }
}
