using Microsoft.Practices.Unity;

namespace Basenet.Educase.IdentityManager.Dependency
{
    public interface IDependencyMap
    {
        void RegisterDependencies(IUnityContainer container);
    }
}
