import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

function Return() {
  return (
       <div className="flex justify-center">
          <Link href="/home">
            <Button className="bg-muted text-muted-foreground hover:bg-muted/80 text-sm px-8">
              戻る
            </Button>
          </Link>
        </div>
  )
}

export default Return
