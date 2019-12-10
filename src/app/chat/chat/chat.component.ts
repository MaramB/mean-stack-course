import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth.service';
import { ChatService } from '../chat.service';
import { Chat } from 'src/app/models/chat.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  user: string;
  room: string;
  messageText: string;
  typingMsg:{user:String,message:String} = {user:"",message:""};
  messageArray:Array<{user:String,message:String}> = [];

  constructor(private chatService: ChatService) {
    chatService.newUserJoined()
      .subscribe(data=> this.messageArray.push(data));

      chatService.userLeftRoom()
      .subscribe(data=> this.messageArray.push(data));

      this.chatService.newMessageReceived()
        .subscribe(data=>{
          this.messageArray.push(data);
          this.typingMsg={user:"", message: ""};
        });

        this.chatService.userTyping()
        .subscribe(data=>this.typingMsg = {user: data.user, message: data.message});
  } 

  join() {
    this.chatService.joinRoom({user: this.user, room: this.room});
  }

  leave() {
    this.chatService.leaveRoom({user: this.user, room: this.room});
  }
  
  sendMessage(){
    this.chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
    this.messageText= "";
  }

  typing() {
    this.chatService.typing({user: this.user, room: this.room});
  }

}
