import { useState, useEffect } from 'react'
import { Children, cloneElement } from 'react'

export function Tabs(props) {
    const arrayChildren = Children.toArray(props.children);

    const click = (e) => {
        alert();
    }

    return (
        <div className="flex text-white bg-tile">
            {Children.map(arrayChildren, (child, index) => {
                return (
                    <>
                        {cloneElement(child, {
                            onClick: click
                        })}
                    </>
                )
            })}
        </div>
    )
}

export function Tab(props) {
    const activeClass = (props.active) ? 'bg-tileLighter' : ''; 

    return (
        <div className={`p-3 px-5 ${activeClass}`} onClick={props.onClick}>
            {props.children}
        </div>
    )
}