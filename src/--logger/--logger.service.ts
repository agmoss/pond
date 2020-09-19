import { Injectable, Scope, Logger } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class __Logger extends Logger {}
