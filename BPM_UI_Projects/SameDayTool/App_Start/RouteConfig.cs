// --------------------------------------------------------------------------------------------------------------------
// <copyright file="RouteConfig.cs" company="AT&T">
//   Copyright © 2014 AT&T
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.SameDayTool
{
    using System.Web.Routing;

    using App.SameDayTool.Routing;

    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.Add("Default", new DefaultRoute());
        }
    }
}
