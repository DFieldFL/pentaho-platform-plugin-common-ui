/*!
 * Copyright 2010 - 2016 Pentaho Corporation. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
  "module",
  "../cartesianAbstract/model",
  "pentaho/i18n!../abstract/i18n/model",
  "../abstract/types/shape",
  "../abstract/types/labelsOption",
  "../abstract/mixins/scaleSizeContinuousType",
  "../abstract/mixins/scaleColorContinuousType"
], function(module, cartesianAbstractModelFactory, bundle, shapeFactory, labelsOptionFactory,
    scaleSizeContinuousType, scaleColorContinuousType) {

  "use strict";

  return function(context) {

    var CartesianAbstract = context.get(cartesianAbstractModelFactory);

    function requiredOneMeasure() {
      /* jshint validthis:true*/
      return !this.model.size.attributes.count && !this.model.color.attributes.count;
    }

    return CartesianAbstract.extend({
        type: {
          sourceId: module.id,
          id: module.id.replace(/.\w+$/, ""),
          v2Id: "ccc_heatgrid",
          category: "heatgrid",
          defaultView: "./View",

          props: [
            {
              name: "rows", //VISUAL_ROLE
              type: {
                props: {attributes: {isRequired: true}}
              },
              ordinal: 5
            },
            {
              name: "columns", //VISUAL_ROLE
              type: "pentaho/visual/role/ordinal",
              ordinal: 6
            },
            {
              name: "color", //VISUAL_ROLE
              type: {
                base: "pentaho/visual/role/quantitative",
                dataType: "number",
                props: {attributes: {countMax: 1, isRequired: requiredOneMeasure}}
              },
              ordinal: 7
            },
            {
              name: "size", //VISUAL_ROLE
              type: {
                base: "pentaho/visual/role/quantitative",
                dataType: "number",
                props: {attributes: {countMax: 1, isRequired: requiredOneMeasure}}
              },
              ordinal: 8
            },
            {
              name: "labelsOption",
              type: {
                base: labelsOptionFactory,
                domain: ["none", "center"]
              },
              isRequired: true,
              value: "none"
            },
            {
              name: "shape",
              type: {
                base: shapeFactory,
                domain: ["none", "circle", "square"]
              },
              isRequired: true,
              value: "square"
            }
          ]
        }
      })
      .implement({type: scaleSizeContinuousType})
      .implement({type: bundle.structured["scaleSizeContinuous"]})
      .implement({type: scaleColorContinuousType})
      .implement({type: bundle.structured["scaleColorContinuous"]})
      .implement({type: bundle.structured["heatGrid"]});
  };
});
