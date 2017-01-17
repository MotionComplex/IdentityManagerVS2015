using Microsoft.Practices.Unity;

namespace Basenet.Educase.IdentityManager.Dependency
{
    public static class UnityExtensions
    {
        public static IUnityContainer RegisterDependencies(this IUnityContainer container, IDependencyMap dependencyMap)
        {
            dependencyMap.RegisterDependencies(container);
            return container;
        }
    }
}
