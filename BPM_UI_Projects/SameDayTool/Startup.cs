// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Startup.cs" company="AT&T">
//   Copyright � 2014 AT&T
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

[assembly: Microsoft.Owin.OwinStartup(typeof(App.SameDayTool.Startup))]

namespace App.SameDayTool
{
    using Owin;

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //// For more information on how to configure your application, visit:
            //// http://go.microsoft.com/fwlink/?LinkID=316888

            this.ConfigureAuth(app);
        }
    }
}
