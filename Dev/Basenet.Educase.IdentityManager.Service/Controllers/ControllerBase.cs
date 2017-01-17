using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Basenet.Educase.Common.Interface.SystemTime;
using Basenet.Educase.Common.Service;
using Basenet.Educase.IdentityManager.Dependency;
using Basenet.Educase.IdentityManager.Facade.ValidationExceptions;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.Configuration;

namespace Basenet.Educase.IdentityManager.Service.Controllers
{
    public class ControllerBase : ApiController
    {
        private IUnityContainer _container;

        protected IUnityContainer Container
        {
            get
            {
                if (_container == null)
                {
                    _container = new UnityContainer();
                    RegisterMapping(_container);

                    _container.RegisterType<ISystemTime, SystemTime>();

                    if (ConfigurationManager.GetSection("unity") != null)
                    {
                        _container.LoadConfiguration();
                    }
                }

                return _container;
            }
        }

        protected HttpResponseMessage CreateSuccessResponseMessage()
        {
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        protected HttpResponseMessage CreateErrorResponseMessage(Exception exception)
        {
            var exceptionType = exception.GetType();

            return exceptionType.Name == typeof(UnprocessableEntityException).Name
                ? Request.CreateErrorResponse((HttpStatusCode) 422, exception.Message)
                : exceptionType.Name == typeof(NotFoundException).Name
                    ? Request.CreateErrorResponse((HttpStatusCode) 404, exception.Message)
                    : Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
        }

        private void RegisterMapping(IUnityContainer container)
        {
            container.RegisterDependencies(new DiagnosticsDependencyMap())
                .RegisterDependencies(new DataModelDependencyMap())
                .RegisterDependencies(new ApiServiceDependencyMap());
        }
    }
}
