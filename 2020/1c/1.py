def check(x,y,step):
    c = abs(x) + abs(y)
    return step >= c
    

def proc(x,y,s):
    step = 0
    if check(x,y,0):
        return step
    for i in range(0,len(s)):
        step += 1
        ch = s[i]
        if ch == 'N':
            y += 1
        elif ch == 'S':
            y -= 1
        elif ch == 'W':
            x -= 1
        else:
            x += 1
        if check(x,y,step):
            return step
    return -1

def main():
    tnum = input()
    tnum = int(tnum)
    for t in range(0,tnum):
        ins = input().split()
        x = int(ins[0])
        y = int(ins[1])
        s = ins[2]
        r = proc(x,y,s)
        if r == -1:
            r = 'IMPOSSIBLE'
        else:
            r = str(r)
        print('Case #%d: %s'%(t+1,r))

if __name__ == "__main__":
    main()