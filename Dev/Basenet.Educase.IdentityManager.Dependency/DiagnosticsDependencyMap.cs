using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Basenet.Educase.Common.Logging;
using Microsoft.Practices.Unity;

namespace Basenet.Educase.IdentityManager.Dependency
{
    public class DiagnosticsDependencyMap : IDependencyMap
    {
        public void RegisterDependencies(IUnityContainer container)
        {
            // register all LogWriters
            container.RegisterType<ILogger, Logger>(new InjectionFactory(c =>
            {
                var log = new LoggerConfiguration()
                    .SetModulName("identitymanager")
                    .AddTraceWriter()
                    .LoadDefaultWriters();

                return log.CreateLogger();
            }));

            //container.RegisterType<IEventHandlerFactory, Common.Event.EventManager.Unity.EventHandlerFactory>();
            //container.RegisterType<IEventBus, EventBus>();
            //container.RegisterType<IEventHandler<Event>, ObjectToLogEventHandler>("ObjectToLogEventHandler", new InjectionConstructor(typeof(IUserIdentification)));
        }
    }
}
