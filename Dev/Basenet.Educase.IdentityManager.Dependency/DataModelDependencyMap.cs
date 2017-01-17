using Basenet.Educase.IdentityManager.DataModel.Data;
using Microsoft.Practices.Unity;

namespace Basenet.Educase.IdentityManager.Dependency
{
    public class DataModelDependencyMap : IDependencyMap
    {
        public void RegisterDependencies(IUnityContainer container)
        {
            container.RegisterType<IIdentityManagerEntities, IdentityManagerEntities>(new ContainerControlledLifetimeManager());
        }
    }
}
