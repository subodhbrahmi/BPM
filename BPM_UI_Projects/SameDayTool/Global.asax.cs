// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Global.asax.cs" company="AT&T">
//   Copyright © 2014 AT&T
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.SameDayTool
{
    using System.Web;
    using System.Web.Optimization;
    using System.Web.Routing;

    public class Application : HttpApplication
    {
        protected void Application_Start()
        {
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
