def gcd(a,b):
    if a%b == 0:
        return b
    return gcd(b,a%b)

def proc(n,d,angs):
    sizes = {}
    angs.sort()
    index = 0
    for ang in angs:
        for i in range(1,d+1):
            div = gcd(ang,i)
            child = ang / div
            parent = i / div
            key = child * 100 + parent
            if key in sizes:
                sizes[key][0] += i-1
                sizes[key][1] += i 
                sizes[key][2].append(index)
            else:
                sizes[key] = [i-1,i,[index]]
            index += 1
    
    result = d - 1
    for k in sizes.keys():
        slices = sizes[k][2]
        dnum = sizes[k][1]
        cuts = sizes[k][0]
        if dnum < d:
            for i in range(0,len(angs)):
                if i in slices:
                    continue
                else:
                    parent = k % 100
                    child = int(k / 100)
                    dtmp = int(ang / (child / parent))
                    dnum += dtmp
                    cuts += dtmp
                if dnum >= d:
                    break
        if dnum >= d and cuts < result:
            result = cuts
    return result
    

def main():
    tnum = input()
    tnum = int(tnum)
    for t in range(0,tnum):
        ins = input().split()
        n = int(ins[0])
        d = int(ins[1])
        ang = [int(x) for x in input().split()]
        r = proc(n,d,ang)
        print('Case #%d: %d'%(t+1,r))

if __name__ == "__main__":
    main()