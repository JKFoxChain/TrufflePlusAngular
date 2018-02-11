import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../environments/environment';
import { ArtifactService } from '../artifactService/artifact.service';

const Web3 = require('web3');

@Component({
    moduleId: module.id,
    templateUrl: "./items.component.html",
    styleUrls: ["./items.component.css"]
})

export class ItemsComponent implements OnInit {

    private isWeb3Connected: boolean = false;
    private web3: any;
    private artifact: any;
    private contract: any;
    private handler: any;
    private account: any;
    private adopters: any[];
    private resp: any;

    constructor(private ref: ChangeDetectorRef, private artifactService: ArtifactService){}

    ngOnInit(){
        var contractName = environment.artifacts.adoptionArtifact.name;
        var netWorkId = environment.artifacts.adoptionArtifact.networkId;
        var httpProviderUrl = environment.chainUrl + ":" + environment.rpcPort;
        
        //please be attention that this web3 js version is less than 1.0, api for web3.js is using nother api methods.
        //window['web3'] is provided by MetaMask but web3 module is still needed to instantite an instance from metmask in js
        if(window['web3'] != undefined){
            this.web3 = new Web3(window['web3'].currentProvider);
        }else{
            this.web3 = new Web3(
                new Web3.providers.HttpProvider(httpProviderUrl)
            );
        }

        console.log("Web3 api version: " + this.web3.version.api);
        console.log("Is web3 connected: "+ this.web3.isConnected());

        this.getAdopters(contractName, netWorkId);

        this.getAcount();
    }

    private getAdopters(contractName, networkId){
        this.artifactService.getArtifact(contractName).subscribe(
            (resp) => {
                this.artifact = resp.json();
                this.contract = this.web3.eth.contract(this.artifactService.getAbi(this.artifact));
                this.handler = this.contract.at(this.artifactService.getAddress(this.artifact, networkId))
                
                this.handler.getAopters((error, result) => {
                    if(error){
                        console.error(error);
                    }else{
                        this.adopters = result;
                        this.ref.detectChanges();
                    }
                });
            },
            (err) => {
                console.error('ItemsComponent OnInit: cannot get the artifact json file. Error: ' + err);
            },
            () => {
            }
        )
    }

    private getAcount(){
        this.web3.eth.getAccounts((error, accounts) => {
            if(error){
                console.error('failed to get account');
            }else{
                this.account = accounts[0];
                this.ref.detectChanges();
            }
        });
    }

    
    private adopt(){
        if(this.account == undefined){
            console.error('cannot find the account');
            return;
        }

        this.handler.adopt(1, {from: this.account}, (error, result) => {
            if(error){
                console.log(error);
            }else{
                console.log('pet adopted sucessfully');
            }
        })
    }

    private checkAvailable(index: number){
        return this.adopters[index] == '0x0000000000000000000000000000000000000000';
    }
}