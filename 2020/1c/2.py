
def main():
    tnum = int(input())
    for t in range(0,tnum):
        u = int(input())
        tmp = {}
        in_arr = []
        max_num = 10 ** u - 1
        for i in range(0,10**4):
            ins = input().split()
            m = int(ins[0])
            r = ins[1]
            in_arr.append([m,len(r),r])
        in_arr.sort()
        for arr in in_arr:
            num = arr[0]
            r = arr[2]
            if num == -1:
                numstr = ['9'] * len(r)
                num = int(''.join(numstr))
            else:
                numstr = str(num)
                maxstr = ['9'] * len(numstr)
                if numstr[0] != '9':
                    maxstr[0] = numstr[0]
                num = int(''.join(maxstr))

            ## 求每位数的范围 确定其可能性
            for i in range(len(r)-1,-1,-1):
                c = r[i]
                n = num % 10
                num = int(num / 10)
                ## 0 - n
                rg = [0,n]
                if i == 0 and arr[1] != 1:
                    rg[0] = 1
                if c not in tmp:
                    tmp[c] = [0,9]
                old_rg = tmp[c]
                if old_rg[0] == old_rg[1]:
                    continue
                
                if rg[0] > old_rg[0]:
                    old_rg[0] = rg[0]
                if rg[1] < old_rg[1]:
                    old_rg[1] = rg[1]
                tmp[c] = old_rg
        arr = []
        for k in tmp.keys():
            arr.append([tmp[k][1]-tmp[k][0],k,tmp[k]])
        arr.sort()

        r = [0] * 10

        for a in arr:
            tmp = a[2]
            k = a[1]
            for i in range(tmp[0],tmp[1]+1):
                if r[i] == 0:
                    r[i] = k
                    break
        print('Case #%d: %s'%(t+1,''.join(r)))

if __name__ == "__main__":
    main()