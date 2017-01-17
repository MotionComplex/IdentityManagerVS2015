using System;

namespace Basenet.Educase.IdentityManager.Facade.Models
{
    public class UserAccount
    {
        public DateTime? ValidFrom { get; set; }

        public DateTime? ValidTo { get; set; }

        public string EmailAddress { get; set; }

        public string Firstname { get; set; }

        public string Identifier { get; set; }

        public string Lastname { get; set; }

        public string Name { get; set; }

        public string Mobile { get; set; }

        public Guid UID { get; set; }
    }
}
