#include<stdio.h>
#include<ncurses.h>
#include<locale.h>
#include<unistd.h>
#include<stdlib.h>
#include<pthread.h>
#include<time.h>

pthread_mutex_t mlock;


#define N 50
char map[N][N+1]={
"##################################################",
"#                                                #",
"#                     ############################",
"#                                                #",
"#####                                            #",
"#                    ^^^^^^^                     #",
"#                              ^^^^^^^           #",
"#            ^^^^^^^                             #",
"#                    #################     #######",
"#   ^^^^^^^^^                                    #",
"#                                ^^^             #",
"#                                  ^^            #",
"###################    ^^^^^^          ^^^       #",
"#    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^     #",
"#                                                #",
"#    Y             ^^^^^^^^                      #",
"#               ^^^         ###########          #",
"#                                          ^^    #",
"#           aaa       aaaaa                      #",
"#                                     ^^^        #",
"#                aaaaaa    #########     ^^^^6   #",
"#                    a                           #",
"#        #############        a                  #",
"#                             a      ^^^^^       #",
"#                             a                  #",
"#                                       a        #",
"#            ##############                      #",
"# ^^^^^^^^^^^^^^^^                        a      #",
"#                                                #",
"#                              ######            #",
"#    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^     #",
"#                                                #",
"#                 ^^^^^^^^^^^^^^^^^              #",
"#           ##############                       #",
"#                                                #",
"#     Y           ##########       ^^^^^^        #",
"#                                                #",
"#          ^^^^^^^^^^^^^^^^^                     #",
"#                                                #",
"#                ############                    #",
"#                                                #",
"#                                            Y   #",
"#                ############                    #",
"#                                                #",
"#       ############                             #",
"#                                                #",
"#             ##########                         #",
"#                                                #",
"#                                                #",
"##################################################",

};

int divx[]={-1,0,0,1};
int divy[]={0,1,-1,0};
int ny =1;
int nx =1;
int hp=100;
int mx =5;
int my =3;
int flag=1;
void gogo()
{
	usleep(500*1000);
	clear();
	mvprintw(30,30,"WIN (%d)",hp);
	refresh();
}
void print()
{
	clear();
	for(int y=0;y<N;y++){
		for(int x=0;x<N;x++){
			if(y ==ny && x ==nx){
				printw("@");
			}
			else if( y==my && x ==mx){
				printw("M");
			}
			else{

				printw("%c",map[y][x]);
			}
		}
		printw("\n");
	}
	printw("HP : %d\n",hp);
	refresh();
}
void *abc(){
	while(flag){

		int a=rand()%4;

		int row = divx[a];
		int col =divy[a];

		if(map[my+row][mx+col] =='#')continue;

		mx = mx+col;
		my = my+row;
		usleep(10*1000);

		
	}
	


}
int main()
{
	srand(time(NULL));
	pthread_t tid;
	initscr();

	setlocale(LC_CTYPE,"ko_KR.utf8");
	pthread_mutex_init(&mlock,NULL);

	
	pthread_create(&tid,NULL,abc,NULL);


	
	nodelay(stdscr,TRUE);
	keypad(stdscr,TRUE);
	while(1){
		//pthread_mutex_lock(&mlock);

		print();
		int ch =getch();
		if(ch ==ERR)ch=0;

		if(ch == KEY_LEFT){
			if(map[ny][nx-1] != '#')nx--;
			if(map[ny][nx] =='^'){
				hp-=10;
			}

		}
		if(ch == KEY_RIGHT){
			if(map[ny][nx+1] != '#')nx++;
			if(map[ny][nx] =='^'){
				hp-=10;
			}
		}	
		if(ch == KEY_DOWN){
			if(map[ny+1][nx] != '#')ny++;
			if(map[ny][nx] =='^'){
				hp-=10;
			}
		}
		if(ch == KEY_UP){
			if(map[ny-1][nx] != '#')ny--;
			if(map[ny][nx] =='^'){
				hp-=10;
			}
		}

		if((ny == my && nx ==mx) || hp == 0){
			print();
			usleep(500*1000);
			clear();
			mvprintw(30,30,"GAME OVER");
			refresh();
			sleep(1);
			clear();
			break;
		}

		if(map[ny][nx] == 'Y'){
			gogo();
			break;
			
		}


		if(map[ny][nx] =='a'){
			hp=100;
			map[ny][nx]=' ';
		}
			
		//pthread_mutex_unlock(&mlock);

	}

	flag=0;
	pthread_join(tid,NULL);
	getch();
	endwin();
	return 0;
}
