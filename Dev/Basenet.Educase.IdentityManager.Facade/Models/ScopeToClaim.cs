using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basenet.Educase.IdentityManager.Facade.Models
{
    public class ScopeToClaim
    {
        public Guid Uid { get; set; }

        public List<Claim> Claims { get; set; }
    }
}
