using System.Collections.Generic;
using System.Web.Http;
using Basenet.Educase.Common.Service;
using Basenet.Educase.IdentityManager;
using Basenet.Educase.IdentityManager.Service.Configuration;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace Basenet.Educase.IdentityManager
{
    public class Startup : ApiStartup
    {
        public Startup()
        {
            Module = "identitymanager";
        }

        protected override IEnumerable<string> GetRequiredScopes()
        {
            return new List<string>
            {
                BasenetConstants.Scopes.MANDANT
            };
        }

        protected override void AppendConfiguration(HttpConfiguration configuration, IAppBuilder app)
        {
            WebApiConfig.Register(configuration, Logger);

            base.AppendConfiguration(configuration, app);
        }
    }
}