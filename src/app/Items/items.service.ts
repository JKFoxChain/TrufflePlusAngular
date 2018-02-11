import { Injectable, Inject } from '@angular/core';
import { ArtifactService } from '../artifactService/artifact.service';
import { environment } from '../../environments/environment';
const Web3 = require('web3');

@Injectable()

export class ItemService {
    // var contractName = environment.artifacts.adoptionArtifact.name;
    // var netWorkId = environment.artifacts.adoptionArtifact.networkId;
    // var httpProviderUrl = environment.chainUrl + ":" + environment.rpcPort;

    private function getWeb3Instance(){
        //please be attention that this web3 js version is less than 1.0, api for web3.js is using nother api methods.
        //window['web3'] is provided by MetaMask but web3 module is still needed to instantite an instance from metmask in js
        if(window['web3'] != undefined){
            return new Web3(window['web3'].currentProvider);
        }else{
            return new Web3(
                new Web3.providers.HttpProvider(httpProviderUrl)
            );
        }
    }

    // private function getAdopters(){
    //     var web3 = this.getWeb3Instance();
    //     var contractName = environment.artifacts.adoptionArtifact.name;
    //     var netWorkId = environment.artifacts.adoptionArtifact.networkId;
    //     this.artifactService.getArtifact(contractName).subscribe(
    //         (resp) => {
    //             this.artifact = resp.json();
    //         },
    //         (err) => {
    //             console.error('ItemsComponent OnInit: cannot get the artifact json file. Error: ' + err);
    //         },
    //         () => {
    //             console.log(this.artifact);
    //             this.contract = this.web3.eth.contract(this.artifactService.getAbi(this.artifact));
    //             this.handler = this.contract.at(this.artifactService.getAddress(this.artifact, netWorkId))
                
    //             this.handler.getAopters((error, result) => {
    //                 if(!error){
    //                     this.adopters = result;
    //                 }else{
    //                     console.error(error);
    //                 }
    //             });
    //         }
    //     )
    // }

    // this.web3.eth.getAccounts((error, accounts) => {
    //     if(error){
    //         console.error('failed to get account');
    //     }else{
    //         this.account = accounts[0];
    //     }
    // })  
}