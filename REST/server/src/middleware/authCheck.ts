import geoIP from "geoip-lite";
import express from "express";
import requestIp from "request-ip";
import UserAgent = ExpressUseragent.UserAgent;

export class AuthCheck {
    public checkGeoIP = (req: express.Request, res:express.Response, next: express.NextFunction) => {
        const ip = requestIp.getClientIp(req);

        const client: UserAgent| undefined = req.useragent;
        if(!ip || !client){
            res.status(403);
            return res.json({err: "Failed to identify your internet connection. Consider changing connection to another network!"});
        }

        if (!client.browser || !client.os || !client.version) {
            res.status(403);
            return res.json({err: "Failed to identify your internet connection. Consider changing connection to another network!"});
        }

        const geo =  geoIP.lookup(ip);
        const localhost = ["127.0.0.1", "::1", "::ffff:127.0.0.1"];
        const {browser, version, os} = client;
        if (process.env.NODE_ENV === "development" && localhost.includes(ip)) {
            // Note: Initialise manual when development
            req.params = {
                ...req.body,
                country: "local",
                city: "local",
                region: "local",
                ip: ip,
                browser,
                version,
                os,
            };
            next();
        } else {
            if(!geo) {
                res.status(403);
                return res.json({err: "Failed! Connection is insecure. Consider changing connection to another network!"});
            }
            const {country, city, region} = geo;
            if(!country || !city || !region) {
                res.status(403);
                return res.json({err: "Failed! Connection is insecure. Consider changing connection to another network!"});
            }

            req.params = {
                ...req.body,
                country,
                city,
                region,
                ip,
                browser,
                version,
                os,
            };

            next();
        }
    }
}

export const authCheck = new AuthCheck();