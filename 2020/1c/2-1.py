def main():
    tnum = int(input())
    for t in range(0,tnum):
        u = int(input())
        tmp = {}
        for i in range(0,10**4):
            ins = input().split()
            r = ins[1]
            c = r[0]
            if c not in tmp:
                tmp[c] = 0
            tmp[c] += 1

            for j in range(1,len(r)):
                c = r[j]
                if c not in tmp:
                    tmp[c] = 0
        arr = []
        for key in tmp.keys():
            arr.append([tmp[key],key])
        arr.sort()

        r = [arr[0][1]]

        for i in range(len(arr)-1,0,-1):
            r.append(arr[i][1])
            
        print('Case #%d: %s'%(t+1,''.join(r)))

if __name__ == "__main__":
    main()