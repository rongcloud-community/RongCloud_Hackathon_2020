from websocket_server import WebsocketServer
import json
import sys
import random
import time

blocks_x = int(30)
blocks_y = int(16)
game_count=0
win_count=0
lose_count=0
#存储信息
map = [[0 for i in range(blocks_x)] for i in range(blocks_y)]
#用于统计是否需要随机点击
luckly = 0
#是否游戏结束
gameover = 0

#用于决策
choose={'x' : 0,'y' : 0,'type': 0}

#统计可翻和可插旗牌
dig_left=0
flag_left=0

#表示第几次决策
count=0

#
restart_flag=1


#插旗
def banner():
	#showmap()
	#global dig_left
	global flag_left
	#dig_left = 0
	flag_left = 0
	choose['x']=0
	choose['y']=0
	choose['type']=2
	for y in range(blocks_y):
		for x in range(blocks_x):
			if 1 <= map[y][x] and map[y][x] <= 5:
				boom_number = map[y][x]
				# print("数字为")
				# print(boom_number)
				# print("坐标为")
				# print(y)
				# print(x)
				block_white = 0
				block_qi = 0
				for yy in range(y-1,y+2):
					for xx in range(x-1,x+2):
						if 0 <= yy and 0 <= xx and yy < blocks_y and xx < blocks_x:
							if not (yy == y and xx == x):
								# print("map的值")
								# print(map[yy][xx])
								if map[yy][xx] == 0:
									block_white += 1
								elif map[yy][xx] == -4:
									block_qi += 1
				# print("空白数为")
				# print(block_white)
				if boom_number == block_white + block_qi:
					# print("有确定的,坐标为")
					# print(y)
					# print(x)
					for yy in range(y - 1, y + 2):
						for xx in range(x - 1, x + 2):
							if 0 <= yy and 0 <= xx and yy < blocks_y and xx < blocks_x:
								if not (yy == y and xx == x):
									if map[yy][xx] == 0:
										#print("插旗{},{}".format(xx,yy))
										#win32api.SetCursorPos([left+xx*block_width, top+yy*block_height])
										# print("移动到")
										# print(left+xx*block_width)
										# print(top+yy*block_height)
										#showmap()
										choose['x']=xx
										choose['y']=yy
										choose['type']=1
										flag_left=flag_left+1

#点击白块
def dig():
	#showmap()
	global dig_left
	#global flag_left
	dig_left = 0
	#flag_left = 0
	iscluck = 0
	for y in range(blocks_y):
		for x in range(blocks_x):
			if 1 <= map[y][x] and map[y][x] <= 5:
				boom_number = map[y][x]
				# print("数字为")
				# print(boom_number)
				# print("坐标为")
				# print(y)
				# print(x)
				block_white = 0
				block_qi = 0
				for yy in range(y - 1, y + 2):
					for xx in range(x - 1, x + 2):
						if 0 <= yy and 0 <= xx and yy < blocks_y and xx < blocks_x:
							if not (yy == y and xx == x):
								if map[yy][xx] == 0:
									block_white += 1
								elif map[yy][xx] == -4:
									block_qi += 1
				# print("空白数为")
				# print(block_white)
				if boom_number == block_qi and block_white > 0:
					# print("有确定的,坐标为")
					# print(y)
					# print(x)
					for yy in range(y - 1, y + 2):
						for xx in range(x - 1, x + 2):
							if 0 <= yy and 0 <= xx and yy < blocks_y and xx < blocks_x:
								if not(yy == y and xx == x):
									if map[yy][xx] == 0:
										#print("点开{},{}".format(xx,yy))
										# print("移动到")
										# print(left + xx * block_width)
										# print(top + yy * block_height)
										choose['x']=xx
										choose['y']=yy
										choose['type']=0
										iscluck = 1
										dig_left = dig_left + 1
	#if iscluck == 0:
	#    luck()

#随机点击
def luck():
	global count
	if test()==1:
		return
	global restart_flag
	if restart_flag == 1:
		choose['x']=15
		choose['y']=8
		choose['type']=0
		restart_flag=0
		return		
	fl = 1
	while(fl):
		random_x = random.randint(0, blocks_x - 1)
		random_y = random.randint(0, blocks_y - 1)
		if(map[random_y][random_x] == 0):
			choose['x']=random_x
			choose['y']=random_y
			choose['type']=0
			#print('luck!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
			fl = 0
	smallest=99999
	smallestx=0
	smallesty=0
	for y in range(blocks_y):
		for x in range(blocks_x):
			current=0
			pcount=0
			if map[y][x] == 0:#只计算未翻的牌
				for xx in range(x-1,x+2):
					for yy in range(y-1,y+2):
						if 0 <= yy and 0 <= xx and yy < blocks_y and xx < blocks_x and map[yy][xx]!=0 and map[yy][xx]!=-4 and map[yy][xx]!=-1:
							white_nums=0
							flag_nums=0
							pcount=pcount+1
							for yyy in range(yy-1,yy+2):
								for xxx in range(xx-1,xx+2):
									if 0 <= yyy and 0 <= xxx and yyy < blocks_y and xxx < blocks_x:
										if not (yyy == yy and xxx == xx):
											# print("map的值")
											# print(map[yy][xx])
											if map[yyy][xxx] == 0:
												white_nums += 1
											if map[yyy][xxx] == -4:
												flag_nums=flag_nums+1
							if flag_nums!=map[yy][xx]:
								current+=map[yy][xx]/white_nums
				if pcount==0:
					current=0.199
				pcount=0
				if current<smallest:
					smallest=current
					smallestx=x
					smallesty=y
	choose['x']=smallestx
	choose['y']=smallesty
	choose['type']=0
	#print("luck{}".format(count))

#计算某个牌及其相邻牌
#公共区域内最多雷数，最少雷数
#以及邻居的在公共区域内最多雷数，最少雷数
def cal_arround(x0,y0,x1,y1):
	if (x0-x1)**2+(y0-y1)**2 != 1:
		print("call_arround_error")
	cur_max_mine=0#x0,y0计算的公共区域最多雷数
	cur_min_mine=0#x0,y0计算的公共区域最少雷数
	neib_max_mine=0#x1,y1计算的公共区域最多雷数
	neib_min_mine=0#x1,y1计算的公共区域最少雷数
	cur_mine=map[y0][x0]
	neib_mine=map[y1][x1]
	if y0==y1 and x1-x0==1:##邻牌在右侧(情况1)
		dig_nums=0
		share_dig_nums=0
		for x in range(x0-1,x0+2):#这里统计x0周围
			for y in range(y0-1,y0+2):
				if 0 <= x and 0 <= y and y < blocks_y and x < blocks_x:
					if not (x==x0 and y==y0):
						if map[y][x]==-4:
							cur_mine=cur_mine-1
						if map[y][x]==0:
							dig_nums=dig_nums+1
							if x==x0 or x==x1:
								share_dig_nums=share_dig_nums+1
		cur_max_mine = min(share_dig_nums,cur_mine)
		cur_min_mine = cur_mine-(dig_nums-share_dig_nums)
		if cur_min_mine>share_dig_nums:
			cur_min_mine=share_dig_nums
		if cur_min_mine<0:
			cur_min_mine=0
		#print("dig_nums0={}".format(dig_nums))

		dig_nums=0
		share_dig_nums=0
		for x in range(x1-1,x1+2):#这里统计x1周围
			for y in range(y1-1,y1+2):
				if 0 <= x and 0 <= y and y < blocks_y and x < blocks_x:
					if not (x==x1 and y==y1):
						if map[y][x]==-4:
							neib_mine=neib_mine-1
						if map[y][x]==0:
							dig_nums=dig_nums+1
							if x==x0 or x==x1:
								share_dig_nums=share_dig_nums+1
		neib_max_mine=min(share_dig_nums,neib_mine)
		neib_min_mine=neib_mine-(dig_nums-share_dig_nums)
		if neib_min_mine>share_dig_nums:
			neib_min_mine=share_dig_nums
		if neib_min_mine<0:
			neib_min_mine=0

	elif y0==y1 and x1-x0==-1:##邻牌在左侧(情况2)
		dig_nums=0
		share_dig_nums=0
		for x in range(x0-1,x0+2):#这里统计x0周围
			for y in range(y0-1,y0+2):
				if 0 <= x and 0 <= y and y < blocks_y and x < blocks_x:
					if not (x==x0 and y==y0):
						if map[y][x]==-4:
							cur_mine=cur_mine-1
						if map[y][x]==0:
							dig_nums=dig_nums+1
							if x==x0 or x==x1:
								share_dig_nums=share_dig_nums+1
		cur_max_mine = min(share_dig_nums,cur_mine)
		cur_min_mine = cur_mine-(dig_nums-share_dig_nums)
		if cur_min_mine>share_dig_nums:
			cur_min_mine=share_dig_nums
		if cur_min_mine<0:
			cur_min_mine=0
		#print("dig_nums0={}".format(dig_nums))

		dig_nums=0
		share_dig_nums=0
		for x in range(x1-1,x1+2):#这里统计x1周围
			for y in range(y1-1,y1+2):
				if 0 <= x and 0 <= y and y < blocks_y and x < blocks_x:
					if not (x==x1 and y==y1):
						if map[y][x]==-4:
							neib_mine=neib_mine-1
						if map[y][x]==0:
							dig_nums=dig_nums+1
							if x==x0 or x==x1:
								share_dig_nums=share_dig_nums+1
		neib_max_mine=min(share_dig_nums,neib_mine)
		neib_min_mine=neib_mine-(dig_nums-share_dig_nums)
		if neib_min_mine>share_dig_nums:
			neib_min_mine=share_dig_nums
		if neib_min_mine<0:
			neib_min_mine=0	

	elif x0==x1 and y0-y1==1:#情况3 上方
		dig_nums=0
		share_dig_nums=0
		for x in range(x0-1,x0+2):#这里统计x0周围
			for y in range(y0-1,y0+2):
				if 0 <= x and 0 <= y and y < blocks_y and x < blocks_x:
					if not (x==x0 and y==y0):
						if map[y][x]==-4:
							cur_mine=cur_mine-1
						if map[y][x]==0:
							dig_nums=dig_nums+1
							if y==y0 or y==y1:
								share_dig_nums=share_dig_nums+1
		cur_max_mine = min(share_dig_nums,cur_mine)
		cur_min_mine = cur_mine-(dig_nums-share_dig_nums)
		if cur_min_mine>share_dig_nums:
			cur_min_mine=share_dig_nums
		if cur_min_mine<0:
			cur_min_mine=0
		#print("dig_nums0={}".format(dig_nums))

		dig_nums=0
		share_dig_nums=0
		for x in range(x1-1,x1+2):#这里统计x1周围
			for y in range(y1-1,y1+2):
				if 0 <= x and 0 <= y and y < blocks_y and x < blocks_x:
					if not (x==x1 and y==y1):
						if map[y][x]==-4:
							neib_mine=neib_mine-1
						if map[y][x]==0:
							dig_nums=dig_nums+1
							if y==y0 or y==y1:
								share_dig_nums=share_dig_nums+1
		neib_max_mine=min(share_dig_nums,neib_mine)
		neib_min_mine=neib_mine-(dig_nums-share_dig_nums)
		if neib_min_mine>share_dig_nums:
			neib_min_mine=share_dig_nums
		if neib_min_mine<0:
			neib_min_mine=0	
	
	elif x0==x1 and y0-y1==-1:#情况4 下方
		dig_nums=0
		share_dig_nums=0
		for x in range(x0-1,x0+2):#这里统计x0周围
			for y in range(y0-1,y0+2):
				if 0 <= x and 0 <= y and y < blocks_y and x < blocks_x:
					if not (x==x0 and y==y0):
						if map[y][x]==-4:
							cur_mine=cur_mine-1
						if map[y][x]==0:
							dig_nums=dig_nums+1
							if y==y0 or y==y1:
								share_dig_nums=share_dig_nums+1
		cur_max_mine = min(share_dig_nums,cur_mine)
		cur_min_mine = cur_mine-(dig_nums-share_dig_nums)
		if cur_min_mine>share_dig_nums:
			cur_min_mine=share_dig_nums
		if cur_min_mine<0:
			cur_min_mine=0
		#print("dig_nums0={}".format(dig_nums))

		dig_nums=0
		share_dig_nums=0
		for x in range(x1-1,x1+2):#这里统计x1周围
			for y in range(y1-1,y1+2):
				if 0 <= x and 0 <= y and y < blocks_y and x < blocks_x:
					if not (x==x1 and y==y1):
						if map[y][x]==-4:
							neib_mine=neib_mine-1
						if map[y][x]==0:
							dig_nums=dig_nums+1
							if y==y0 or y==y1:
								share_dig_nums=share_dig_nums+1
		neib_max_mine=min(share_dig_nums,neib_mine)
		neib_min_mine=neib_mine-(dig_nums-share_dig_nums)
		if neib_min_mine>share_dig_nums:
			neib_min_mine=share_dig_nums
		if neib_min_mine<0:
			neib_min_mine=0		


	return cur_max_mine,cur_min_mine,neib_min_mine,cur_mine,neib_mine
	

def test():
	global count
	for x in range(blocks_x-1):
		for y in range(blocks_y):
			if map[y][x]!=0 and map[y][x]!=-1 and map[y][x]!=-4:###情况一，向右
				if map[y][x+1]!=0 and map[y][x+1]!=-1 and map[y][x+1]!=-4:
					tmp=cal_arround(x,y,x+1,y)#情况一，向右
					if tmp[0]==tmp[2] and tmp[0]>0 and tmp[2]>0:#如果当前数字公共最多的雷，等于，邻居在公共区域雷最少数目 则邻居未检测区域为雷
						for yy in range(y-1,y+2):
							xx = x+2
							if  0 <= yy and 0 <= xx and yy < blocks_y and xx < blocks_x and map[yy][xx]==0:
								choose['x']=xx
								choose['y']=yy
								choose['type']=1
								# print("{},{},Test success banner!!!!!!!{}".format(xx,yy,count))
								#time.sleep(100)
								return 1
					if tmp[1]==tmp[4] and tmp[1]>0:
						for yy in range(y-1,y+2):
							xx = x+2
							if  0 <= yy and 0 <= xx and yy < blocks_y and xx < blocks_x and map[yy][xx]==0:
								choose['x']=xx
								choose['y']=yy
								choose['type']=0
								#time.sleep(100)
								# print("{},{},Test success dig!!!!!!!{}".format(xx,yy,count))
								return 1
	###情况二，向左
	for x in range(1,blocks_x):
		for y in range(blocks_y):
			if map[y][x]!=0 and map[y][x]!=-1 and map[y][x]!=-4:
				if map[y][x-1]!=0 and map[y][x-1]!=-1 and map[y][x-1]!=-4:
					tmp=cal_arround(x,y,x-1,y)#情况二，向左
					if tmp[0]==tmp[2] and tmp[0]>0 and tmp[2]>0:#如果当前数字公共最多的雷，等于，邻居在公共区域雷最少数目 则邻居未检测区域为雷
						
						for yy in range(y-1,y+2):
							xx = x-2
							if  0 <= yy and 0 <= xx and yy < blocks_y and xx < blocks_x and map[yy][xx]==0:
								choose['x']=xx
								choose['y']=yy
								choose['type']=1
								# print("{},{},Test success banner2!!!!!!!{}".format(xx,yy,count))
								#time.sleep(100)
								return 1
					if tmp[1]==tmp[4] and tmp[1]>0:
						for yy in range(y-1,y+2):
							xx = x-2
							if  0 <= yy and 0 <= xx and yy < blocks_y and xx < blocks_x and map[yy][xx]==0:
								choose['x']=xx
								choose['y']=yy
								choose['type']=0
								#time.sleep(100)
								# print("{},{},Test success dig2!!!!!!!{}".format(xx,yy,count))
								return 1
	###情况三，向上
	for x in range(blocks_x):
		for y in range(1,blocks_y):
			if map[y][x]!=0 and map[y][x]!=-1 and map[y][x]!=-4:
				if map[y-1][x]!=0 and map[y-1][x]!=-1 and map[y-1][x]!=-4:
					tmp=cal_arround(x,y,x,y-1)#情况三，向上
					if tmp[0]==tmp[2] and tmp[0]>0 and tmp[2]>0:#如果当前数字公共最多的雷，等于，邻居在公共区域雷最少数目 则邻居未检测区域为雷
						#print("4ban")
						for xx in range(x-1,x+2):
							yy = y-2
							if  0 <= yy and 0 <= xx and yy < blocks_y and xx < blocks_x and map[yy][xx]==0:
								choose['x']=xx
								choose['y']=yy
								choose['type']=1
								# print("{},{},Test success banner3!!!!!!!{}".format(xx,yy,count))
								#time.sleep(100)
								return 1
					if tmp[1]==tmp[4] and tmp[1]>0:
						#print("4dig")
						for xx in range(x-1,x+2):
							yy = y-2
							if  0 <= yy and 0 <= xx and yy < blocks_y and xx < blocks_x and map[yy][xx]==0:
								choose['x']=xx
								choose['y']=yy
								choose['type']=0
								#time.sleep(100)
								# print("{},{},Test success dig3!!!!!!!{}".format(xx,yy,count))
								return 1
	###情况四，向下
	for x in range(blocks_x):
		for y in range(blocks_y-1):
			if map[y][x]!=0 and map[y][x]!=-1 and map[y][x]!=-4:
				if map[y+1][x]!=0 and map[y+1][x]!=-1 and map[y+1][x]!=-4:
					tmp=cal_arround(x,y,x,y+1)#情况四，向下
					if tmp[0]==tmp[2] and tmp[0]>0 and tmp[2]>0:#如果当前数字公共最多的雷，等于，邻居在公共区域雷最少数目 则邻居未检测区域为雷
						#print("4ban")
						for xx in range(x-1,x+2):
							yy = y+2
							if  0 <= yy and 0 <= xx and yy < blocks_y and xx < blocks_x and map[yy][xx]==0:
								choose['x']=xx
								choose['y']=yy
								choose['type']=1
								# print("{},{},Test success banner4!!!!!!!{}".format(xx,yy,count))
								#time.sleep(100)
								return 1
					if tmp[1]==tmp[4] and tmp[1]>0:
						#print("4dig")
						for xx in range(x-1,x+2):
							yy = y+2
							if  0 <= yy and 0 <= xx and yy < blocks_y and xx < blocks_x and map[yy][xx]==0:
								choose['x']=xx
								choose['y']=yy
								choose['type']=0
								#time.sleep(100)
								# print("{},{},Test success dig4!!!!!!!{}".format(xx,yy,count))
								return 1
								

	return 0

		
	


################################################

			

# Called for every client connecting (after handshake)
def new_client(client, server):
	time.sleep(0.5)
	choose['x']=15
	choose['y']=8
	choose['typed']=0
	server.send_message_to_all(json.dumps(choose))


# Called for every client disconnecting
def client_left(client, server):
	print("Client(%d) disconnected" % client['id'])


# Called when a client sends a message
def message_received(client, server, message):
	#time.sleep(1)
	global choose
	global count
	global map
	global gameover
	global game_count
	global lose_count
	global win_count
	global dig_left
	global flag_left
	global restart_flag
	data = json.loads(message)
	#print("Client{} said:{} ".format(client['id'],data['res']))
	#print(data)
	map=data['res']
	#x=int(input())
	#y=int(input())
	#typeq=int(input())
	if data['gameover']==1:
		#time.sleep(0.5)
		restart_flag=1
		#表示失败
		#gameover=1
		game_count+=1
		lose_count+=1
		#type为9要求重玩，前端准备初始化游戏
		choose={'x' : 0,'y' : 0,'type': 9}
		#print(choose)
		server.send_message_to_all(json.dumps(choose))
		print("总共玩了{}局,赢了{}局,输了{}局,目前胜率{}".format(game_count,win_count,lose_count,win_count/game_count))
		return
	elif data['gameover']==2:
		#time.sleep(1)
		restart_flag=1
		#表示胜利
		#gameover=2
		game_count+=1
		win_count+=1
		#type为9要求重玩，前端准备初始化游戏
		choose={'x' : 0,'y' : 0,'type': 9}
		#print(choose)
		server.send_message_to_all(json.dumps(choose))
		print("总共玩了{}局,赢了{}局,输了{}局,目前胜率{}".format(game_count,win_count,lose_count,win_count/game_count))
		return

	banner()
	#print("digLeft={}".format(dig_left))
	if flag_left==0:
		dig()
		#print("flag={}".format(flag_left))
		if dig_left==0:
			luck()
	dig_left = 0
	flag_left = 0

	#count=count+1
	#luck
	x=choose['x']
	y=choose['y']
	typeq=choose['type']
	choose={'x' : x,'y' : y,'type': typeq}
	#print(choose)
	#print("随缘{},{},{}".format(x,y,typeq))
	count=count+1
	server.send_message_to_all(json.dumps(choose))


PORT=9002
server = WebsocketServer(PORT)
server.set_fn_new_client(new_client)
server.set_fn_client_left(client_left)
server.set_fn_message_received(message_received)
server.run_forever()