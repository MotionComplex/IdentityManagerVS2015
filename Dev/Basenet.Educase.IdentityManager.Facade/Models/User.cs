using System;

namespace Basenet.Educase.IdentityManager.Facade.Models
{
    public class User
    {
        public Guid UID { get; set; }
        
        public string Name { get; set; }

        public string Lastname { get; set; }

        public string Firstname { get; set; }
        
        public string EmailAddress { get; set; }
    }
}
