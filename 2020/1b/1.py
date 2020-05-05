def proc(index,x,y):
    open = [[0,0]]
    step = 1
    dir = [[0,1],[0,-1],[1,0],[-1,0]] # N,S,E,W
    tab = {}
    def addresult(x,y,fx,fy,dir):
        if x < 0 or y < 0:
            return
        if x not in tab:
            tab[x] = {}
        if y not in tab[x]:
            tab[x][y] = [fx,fy]

    while True:
        newOpen = []
        for point in open:
            cx = point[0]
            cy = point[1]
            for d in dir:
                stepx = d[0] * step
                stepy = d[1] * step
                tx = cx + stepx
                ty = cy + stepy
                newOpen.append([tx,ty])
                addresult(tx,ty,cx,cy,d)
        open = newOpen
        step *= 2
        if step > 10:
            break
    for t in sorted(tab):  
        s = ''
        for k in sorted(tab[t]):
            s += str(tab[t][k][0]) + ',' + str(tab[t][k][1]) + '=>'+str(t) + ',' + str(k) + ' ' 
        print("%d %s"%(t,s))
def main():
    T = int(input(""))
    for i in range(0,T):
        xy = [int(x) for x in input().split()]
        x = xy[0]
        y = xy[1]
        proc(i+1,x,y)
        
if __name__ == "__main__":
    main()