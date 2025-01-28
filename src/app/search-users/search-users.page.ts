import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.page.html',
  styleUrls: ['./search-users.page.scss'],
  standalone: false
})
export class SearchUsersPage implements OnInit {
  users: any [] = [];
  page: number = 1;
  limit: number = 10;
  query: string = '';
  hasHoreUsers: boolean = true;
  constructor(
    private userService: UserService,
    private storage: Storage
    
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers(event?: any){
    const currentUser = await this.storage.get('user');
    const followingUsers = currentUser.following_users || [];
    this.userService.listUsers(this.page, this.limit, this.query).then(
      (data: any) => {
        if(data.users.length > 0 ){
          const updateUsers = data.users.map((user: any) => ({
            ...user,
            is_following: followingUsers.some((followedUser: any) => followedUser.id == user.id)
          }));
          this.users = [...this.users, ...data.users];
          this.page++;
        }else{
          this.hasHoreUsers = false;
        }
        if (event){
          event.target.complet();
        }
      }
    ).catch(
      (error) => {
        console.log(error);
        event.target.complet();
      }
    );
  }
  searchUsers(event?: any){
    this.query = event.target.value || '';
    this.page = 1;
    this.users = [];
    this.hasHoreUsers = true;
    this.loadUsers(null);
  }
  follow(user_id: any){
    console.log('follow', user_id);
  }
  unfollow(user_id: any){
    console.log('unfollow', user_id);
  }
  async isFollowing(user_id: any): Promise<boolean>{
    console.log('isFollowing', user_id);
    const user = await this.storage.get('user');
    const response = user.following_users.some((followedUser:any) => followedUser.id == user_id);
    console.log(response, "response")
    return response;
  }
  async toggleFollow(user_id: number){
    if (await this.isFollowing){
      this.unfollow(user_id);
    }else{
      this.follow(user_id);
    }
  }
}
