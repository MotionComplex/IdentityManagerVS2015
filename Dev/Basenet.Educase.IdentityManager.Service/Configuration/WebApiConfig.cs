using System.Net.Http.Formatting;
using System.Web.Http;
using Basenet.Educase.Common.Logging;
using Basenet.Educase.Common.Service.ActionFilters;
using Newtonsoft.Json;

namespace Basenet.Educase.IdentityManager.Service.Configuration
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config, ILogger logger)
        {
            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter());
            config.Formatters.JsonFormatter.SerializerSettings.TypeNameHandling = TypeNameHandling.Auto;
            config.Filters.Add(new ValidationFilterAttribute());

            config.Routes.MapHttpRoute(
                name: "AddUserToTenantController",
                routeTemplate: "api/{controller}/{mandatoruid}");

            config.Routes.MapHttpRoute(
                name: "ControllerAndUidParameter",
                routeTemplate: "api/{controller}/{uid}");

            config.Routes.MapHttpRoute(
                name: "ControllerOnly",
                routeTemplate: "api/{controller}");
        }
    }
}
