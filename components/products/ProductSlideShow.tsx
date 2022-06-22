import React, { FC } from 'react'
import {Slide} from 'react-slideshow-image'
import style from './ProductSlideShow.module.css'

interface Props{
    images: string[]
}

export const ProductSlideShow:FC<Props> = ({images}) => {
  return (
    <>
        <Slide
          easubg="ease"
          duration={7000}
          indicators
        >
          {
            images.map(image=>{
              const url = `/products/${image}`
                return(
                  <div className={style['each-slide']} key={image}>
                    <div style={{
                      backgroundImage: `url(${url})`,
                      backgroundSize: 'cover'
                    }}>

                    </div>
                  </div>
                )
            })
          }
        </Slide>
    </>
  )
}
