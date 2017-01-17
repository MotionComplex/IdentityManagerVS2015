using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basenet.Educase.IdentityManager.Facade.Models
{
    public class Claim
    {
        public Guid UID { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool AlwaysIncludeInIdToken { get; set; }
    }
}
