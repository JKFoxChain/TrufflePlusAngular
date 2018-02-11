import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class ArtifactService {
    constructor (private http: Http){}

    private prefix = 'assets/';

    public getArtifact(artifact: string): Observable<Response> {
        if(artifact != undefined && artifact != null){
            return this.http.get(this.prefix + artifact);
        }else{
            console.error('artifact name cannot be null');
            return new Observable(null);
        }
    }

    public getAbi(artifact: JSON): string {
        return artifact['abi'];
    }

    public getAddress(artifact: JSON, networkId: string): string{
        return artifact['networks'][networkId]['address'];
    }

}