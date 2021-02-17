import React from 'react';
import { Link } from "@reach/router";
import { useMountPoint } from '@mfe/main';

const styleObj = {
  position: 'fixed',
  width: '100vw',
  top: '0px',
  'z-index': 100,
}

export default function Root(props) {
  const { items, loading, error } = useMountPoint('left-nav');

  if (loading) {
    return (
      <div>Loading</div>
    );
  } else if (error) {
    return (
      <div>{error}</div>
    );
  } else {
    return (
      <nav style={styleObj}>
        <div>
          <div>
            {items.map((link) => {
              return (
                <Link key={link.id} to={link.route}>
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }
}
