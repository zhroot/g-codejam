
def genTabs(r,c,cells):
    tabs = []
    totalLevel = 0
    for x in range(0,r):
        neighbors = []
        for y in range(0,c):
            dir = [[-1,0],[1,0],[0,-1],[0,1]] # left,right,down,up
            neighbor = [[],[],[],[]] # left,right,down,up
            neighborLevel = 0
            neighborNum = 0
            for i in range(0,len(dir)):
                newX = x + dir[i][0]
                newY = y + dir[i][1]
                if newX < 0 or newX >= r or newY < 0 or newY >= c:
                    continue;
                neighbor[i] = [newX,newY]
                neighborNum += 1
                neighborLevel += cells[newX][newY]
            
            if neighborNum > 0 and cells[x][y] < neighborLevel/neighborNum:
                open.append([x,y])
            totalLevel += cells[x][y]
            neighbors.append(neighbor)
        tabs.append(neighbors)
    return tabs,totalLevel

def proc(index,r,c,cells):
    # gen tables
    tabs,totalLevel = genTabs(r,c,cells)
    open = []
    result = totalLevel
    closeNeighbors = set()

    while len(open) > 0:
        neighborsSet = set()
        for candidate in open:
            x = candidate[0]
            y = candidate[1]
            closeNeighbors.add(x*c+y)
            totalLevel -= cells[x][y]
            # update neighbor's neighbor
            neighbors = tabs[x][y]
            if len(neighbors[0]) > 0:  # left 
                leftX = neighbors[0][0]
                leftY = neighbors[0][1]
                tabs[leftX][leftY][1] = tabs[x][y][1]
                neighborsSet.add(leftX*c+leftY)
            if len(neighbors[1]) > 0: #right
                rightX = neighbors[1][0]
                rightY = neighbors[1][1]
                tabs[rightX][rightY][0] = tabs[x][y][0]
                neighborsSet.add(rightX*c+rightY)
            if len(neighbors[2]) > 0: #down
                downX = neighbors[2][0]
                downY = neighbors[2][1]
                tabs[downX][downY][3] = tabs[x][y][3]
                neighborsSet.add(downX*c+downY)
            if len(neighbors[3]) > 0: #up
                upX = neighbors[3][0]
                upY = neighbors[3][1]
                tabs[upX][upY][2] = tabs[x][y][2]
                neighborsSet.add(upX*c+upY)
        open.clear()
        for neighbor in neighborsSet:
            if neighbor in closeNeighbors:
                continue
            ny = neighbor % c
            nx = int(neighbor / c)
            neighborLevel = 0
            neighborNum = 0
            for dir in tabs[nx][ny]:
                if len(dir) > 0:
                    neighborNum += 1
                    neighborLevel += cells[dir[0]][dir[1]]
            if neighborNum > 0 and cells[nx][ny] < neighborLevel/neighborNum:
                open.append([nx,ny])
        result += totalLevel
    print("Case #%d: %d"%(index,result))


def main():
    T = int(input(""))
    for i in range(0,T):
        RC = [int(x) for x in input().split()]
        R = int(RC[0])
        C = int(RC[1])
        cells = []
        for r in range(0,R):
            cells.append([int(x) for x in input().split()])
        proc(i+1,R,C,cells)
        
if __name__ == "__main__":
    main()

# proc(1,1,1,[[15]])

# proc(2,3,3,[[1,1,1],[1,2,1],[1,1,1]])

# proc(3,1,3,[[3,1,2]])
# proc(4,3,1,[[1],[2],[3]])
