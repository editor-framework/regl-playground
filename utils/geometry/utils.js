'use strict';

module.exports = {
  wireframe (indices) {
    const offsets = [[0, 1], [1, 2], [2, 0]];
    let lines = [];
    let lineIDs = {};

    for (let i = 0; i < indices.length; i += 3) {
      for (let k = 0; k < 3; ++k) {
        let i1 = indices[i + offsets[k][0]];
        let i2 = indices[i + offsets[k][1]];

        // check if we already have the line in our lines
        let id = (i1 > i2) ? ((i2 << 16) | i1) : ((i1 << 16) | i2);
        if ( lineIDs[id] === undefined ) {
          lineIDs[id] = 0;
          lines.push(i1, i2);
        }
      }
    }

    return lines;
  },

  normals (positions, normals, len) {
    if ( len === undefined ) {
      len = 1;
    }

    let verts = new Array(2 * positions.length);

    for ( let i = 0; i < positions.length; ++i ) {
      let pos = positions[i];
      let normal = normals[i];

      // line start
      verts[2*i] = pos;

      // line end
      verts[2*i + 1] = [
        pos[0] + normal[0] * len,
        pos[1] + normal[1] * len,
        pos[2] + normal[2] * len,
      ];
    }

    return verts;
  },
};
