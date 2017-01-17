using System;
using System.Collections.Generic;
using System.Linq;
using Basenet.Educase.IdentityManager.Facade.Models;
using Basenet.Educase.IdentityManager.Facade.Properties;

namespace Basenet.Educase.IdentityManager.Facade.Validations
{
    public class ResourceValidator
    {
        private readonly IAccountFacade _accountFacade;

        public ResourceValidator(IAccountFacade accountFacade)
        {
            _accountFacade = accountFacade;
        }

        public string Validate(Guid mandatorUid, UserAccount account)
        {
            var validationMessages = new List<string>();

            var tenantError = ValidateTenant(mandatorUid);
            if (!string.IsNullOrEmpty(tenantError))
            {
                validationMessages.Add(tenantError);
            }

            return validationMessages.Any()
                ? string.Join(Environment.NewLine, validationMessages.ToArray())
                : string.Empty;
        }

        private string ValidateTenant(Guid mandatorUid)
        {
            var existTenant = _accountFacade.IsExistTenant(mandatorUid);
            return existTenant ? string.Empty : Resources.The_Tenant_does_not_exist;
        }
    }
}
