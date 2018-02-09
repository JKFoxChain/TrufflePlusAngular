import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import {} from 'truffle';

const Web3 = require('web3');

@Component({
    moduleId: module.id,
    selector: 'items',
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

    constructor(private http: Http){}

    ngOnInit(){
        console.log(Web3);
        
        //please be attention that this web3 js version is less than 1.0, api for web3.js is using nother api methods.
        //window['web3'] is provided by MetaMask
        if(window['web3'] != undefined){
            this.web3 = new Web3(window['web3'].currentProvider);
        }else{
            this.web3 = new Web3(
                new Web3.providers.HttpProvider('http://localhost:8545')
            );
        }

        console.log("Web3 api version: " + this.web3.version.api);
        console.log("Is web3 connected: "+ this.web3.isConnected());

        this
            .http
            .get("assets/Adoption.json")
            .subscribe(
                (resp) => {
                    this.artifact = resp.json();
                },
                (err) => {
                    console.error('ItemsComponent OnInit: cannot get the artifact json file. Error: ' + err);
                },
                () => {
                    console.log(this.artifact);
                    this.contract = this.web3.eth.contract(this.artifact['abi']);
                    this.handler = this.contract.at(this.artifact['networks']['1']['address']);

                    this.handler.getAopters(function(error, result){
                        if(!error){
                            console.log(result);
                        }else{
                            console.error(error);
                        }
                    });
                }
        )
    }

    private setAccount(){
        if(this.account == undefined) {
            // use fat arrow instead of keyword function is because fat arrow will not create its own "this" context
            this.web3.eth.getAccounts((error, accounts) => {
                if(error){
                    console.error('failed to get account');
                }else{
                    console.log(accounts);
                    this.account = accounts[0];
                    console.log('account set as ' + this.account);
                }
            });
        }
    }

    
    private adopt(){
        if(this.account == undefined){
            console.error('cannot find the account');
            return;
        }

        this.handler.adopt(1, {from: this.account}, (error, result) => {
            if(error){
                console.log(this.account + 'is being used');
                console.log(error);
            }else{
                console.log('sucess');
            }
        })

        // this.handler.adopt(8, function(error, result){
        //     if(!error){
        //         console.log(result);
        //     }else{
        //         console.error(error);
        //     }
        // });
    }
}