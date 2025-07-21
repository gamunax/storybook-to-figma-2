import { Component, OnInit } from '@angular/core';
import { IconSizes } from 'atlas-icon';
import { QaAccordionItem } from './qa-accordion.const';

@Component({
  selector: 'app-qa-accordion',
  templateUrl: './qa-accordion.component.html',
  styleUrls: ['./qa-accordion.component.scss']
})
export class QaAccordionComponent implements OnInit {

  constructor() { }

  accordionItems: QaAccordionItem [] = [
    {
      id: 'i1',
      heading: "TC1",
      subheading: "SubHeading",
      expanded: false,
      disabled: false,
      iconSize: IconSizes.small,
      content: [
        "Content 1",
        "Content 1",
      ]
    },
    {
      id:'i2',
      heading: "TC2",
      subheading: "SubHeading",
      expanded: true,
      disabled: false,
      iconSize: IconSizes.medium,
      content: [
        "Content 1",
        "Content 1",
      ]
    },
    {
      id:'i3',
      heading: "TC3",
      subheading: "SubHeading",
      expanded: false,
      disabled: true,
      iconSize: IconSizes.medium,
      content: [
        "Content 1",
        "Content 1",
      ]
    },
    {
      id:'i4',
      heading: "TC4",
      subheading: "SubHeading",
      expanded: true,
      disabled: true,
      iconSize: IconSizes.medium,
      content: [
        "Content 1",
        "Content 1",
      ]
    }
  ]

  accordionGroup1: QaAccordionItem  = {
    id:'g1',
    expandedAll: true
  }

  accordionGroup2: QaAccordionItem = {
    id:'g2',
    expandedAll: false
  }

  accordionItemsOne: QaAccordionItem [] = [
    {
      id: 'g1i1',
      heading: "Test",
      subheading: "SubHeading",
      expanded: false,
      disabled: false,
      iconSize: IconSizes.small,
      content: [
        "Content 1",
        "Content 1",
      ]
    },
    {
      id:'g1i2',
      heading: "test",
      subheading: "SubHeading",
      expanded: true,
      disabled: false,
      iconSize: IconSizes.medium,
      content: [
        "Content 1",
        "Content 1",
      ]
    },
    {
      id:'g1i3',
      heading: "test",
      subheading: "SubHeading",
      expanded: false,
      disabled: true,
      iconSize: IconSizes.medium,
      content: [
        "Content 1",
        "Content 1",
      ]
    },
    {
      id:'g1i4',
      heading: "test",
      subheading: "SubHeading",
      expanded: true,
      disabled: true,
      iconSize: IconSizes.medium,
      content: [
        "Content 1",
        "Content 1",
      ]
    }
  ]

  accordionItemsTwo: QaAccordionItem [] = [
    {
      id: 'g2i1',
      heading: "Test",
      subheading: "SubHeading",
      expanded: false,
      disabled: false,
      iconSize: IconSizes.small,
      content: [
        "Content 1",
        "Content 1",
      ]
    },
    {
      id:'g2i2',
      heading: "test",
      subheading: "SubHeading",
      expanded: true,
      disabled: false,
      iconSize: IconSizes.medium,
      content: [
        "Content 1",
        "Content 1",
      ]
    },
    {
      id:'g2i3',
      heading: "test",
      subheading: "SubHeading",
      expanded: false,
      disabled: true,
      iconSize: IconSizes.medium,
      content: [
        "Content 1",
        "Content 1",
      ]
    },
    {
      id:'g2i4',
      heading: "test",
      subheading: "SubHeading",
      expanded: true,
      disabled: true,
      iconSize: IconSizes.medium,
      content: [
        "Content 1",
        "Content 1",
      ]
    }
  ]

  ngOnInit(): void {
  }

}