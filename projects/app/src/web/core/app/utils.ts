import { AppSimpleEditFormType } from '@fastgpt/global/core/app/type';
import { ModuleItemType } from '@fastgpt/global/core/module/type';
import { POST } from '@/web/common/api/request';
import { FlowNodeInputTypeEnum, FlowNodeTypeEnum } from '@fastgpt/global/core/module/node/constant';
import { ModuleInputKeyEnum } from '@fastgpt/global/core/module/constants';
import type { FormatForm2ModulesProps } from '@fastgpt/global/core/app/api.d';
import { useSystemStore } from '@/web/common/system/useSystemStore';

export async function postForm2Modules(data: AppSimpleEditFormType) {
  const llmModelList = useSystemStore.getState().llmModelList;
  function userGuideTemplate(formData: AppSimpleEditFormType): ModuleItemType[] {
    return [
      {
        name: 'core.module.template.User guide',
        flowType: FlowNodeTypeEnum.userGuide,
        inputs: [
          {
            key: ModuleInputKeyEnum.welcomeText,
            type: FlowNodeInputTypeEnum.hidden,
            label: 'core.app.Welcome Text',
            value: formData.userGuide.welcomeText
          },
          {
            key: ModuleInputKeyEnum.variables,
            type: FlowNodeInputTypeEnum.hidden,
            label: 'core.app.Chat Variable',
            value: formData.userGuide.variables
          },
          {
            key: ModuleInputKeyEnum.questionGuide,
            type: FlowNodeInputTypeEnum.hidden,
            label: 'core.app.Question Guide',
            value: formData.userGuide.questionGuide
          },
          {
            key: ModuleInputKeyEnum.tts,
            type: FlowNodeInputTypeEnum.hidden,
            label: 'core.app.TTS',
            value: formData.userGuide.tts
          }
        ],
        outputs: [],
        position: {
          x: 447.98520778293346,
          y: 721.4016845336229
        },
        moduleId: 'userGuide'
      }
    ];
  }
  const maxToken =
    llmModelList.find((item) => item.model === data.aiSettings.model)?.maxResponse || 4000;

  const props: FormatForm2ModulesProps = {
    formData: data,
    chatModelMaxToken: maxToken,
    llmModelList
  };

  const modules = await POST<ModuleItemType[]>(`/core/app/form2Modules/fastgpt-universal`, props);

  return [...userGuideTemplate(data), ...modules];
}
