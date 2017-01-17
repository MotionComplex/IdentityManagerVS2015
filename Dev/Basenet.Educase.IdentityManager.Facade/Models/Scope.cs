using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Basenet.Educase.IdentityManager.DataModel.Data;

namespace Basenet.Educase.IdentityManager.Facade.Models
{
    public class Scope
    {
        public Guid UID { get; set; }
        
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string ScopeType { get; set; }

        public bool? IsRequired { get; set; }
    }
}
