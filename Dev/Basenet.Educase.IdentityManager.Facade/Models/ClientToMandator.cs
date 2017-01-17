using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basenet.Educase.IdentityManager.Facade.Models
{
    public class ClientToMandator
    {
        public Guid Uid { get; set; }

        public List<Mandator> Mandators { get; set; }
    }
}
