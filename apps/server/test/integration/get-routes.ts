import { INestApplication } from "@nestjs/common";

export type Route = {
  method: string;
  path: string;
};

export function getRoutes(app: INestApplication): Route[] {
  const server = app.getHttpServer();
  const router = server._events.request._router;
  return router.stack.flatMap((layer: any) => {
    return layer.route !== undefined
      ? [
          {
            path: layer.route.path,
            method: layer.route.stack[0].method,
          },
        ]
      : [];
  });
}
